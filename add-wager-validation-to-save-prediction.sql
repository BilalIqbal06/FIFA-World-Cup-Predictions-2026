-- Add database-side validation to prevent duplicate round wagers in save_prediction RPC
-- This ensures duplicate round wagers can never happen, even if UI is bypassed
-- Only the wager column is validated - normal predictions are always allowed

-- Wager ranges:
-- Round of 32: Games 73-88
-- Round of 16: Games 89-96
-- Quarterfinals + Semifinals: Games 97-102

CREATE OR REPLACE FUNCTION save_prediction(p_player_code VARCHAR(8), p_game_id VARCHAR(50), p_prediction VARCHAR(10), p_wager INTEGER DEFAULT 0)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_player_id UUID;
  v_game_id_num INTEGER;
  v_range_start INTEGER;
  v_range_end INTEGER;
  v_has_existing_wager BOOLEAN;
BEGIN
  -- Get player_id from player_code
  SELECT p.id INTO v_player_id
  FROM players p
  WHERE p.player_code = p_player_code;
  
  IF v_player_id IS NULL THEN
    RAISE EXCEPTION 'Player not found';
  END IF;
  
  -- Validate wager: prevent duplicate round wagers
  IF p_wager > 0 THEN
    v_game_id_num := p_game_id::INTEGER;
    
    -- Determine wager range
    IF v_game_id_num BETWEEN 73 AND 88 THEN
      -- Round of 32: Games 73-88
      v_range_start := 73;
      v_range_end := 88;
    ELSIF v_game_id_num BETWEEN 89 AND 96 THEN
      -- Round of 16: Games 89-96
      v_range_start := 89;
      v_range_end := 96;
    ELSIF v_game_id_num BETWEEN 97 AND 102 THEN
      -- Quarterfinals + Semifinals: Games 97-102
      v_range_start := 97;
      v_range_end := 102;
    ELSE
      -- Not in a wager-eligible range, allow the wager
      v_range_start := -1;
      v_range_end := -1;
    END IF;
    
    -- Check if player already has a wager in this range
    IF v_range_start != -1 THEN
      SELECT EXISTS(
        SELECT 1 FROM predictions
        WHERE player_id = v_player_id
        AND game_id::INTEGER BETWEEN v_range_start AND v_range_end
        AND wager > 0
        AND game_id != p_game_id
      ) INTO v_has_existing_wager;
      
      IF v_has_existing_wager THEN
        RAISE EXCEPTION 'You already used your wager for this round. Please make a normal prediction instead.';
      END IF;
    END IF;
  END IF;
  
  -- Upsert prediction
  INSERT INTO predictions (player_id, game_id, prediction, wager)
  VALUES (v_player_id, p_game_id, p_prediction, p_wager)
  ON CONFLICT (player_id, game_id)
  DO UPDATE SET
    prediction = EXCLUDED.prediction,
    wager = EXCLUDED.wager,
    updated_at = NOW();
END;
$$;

GRANT EXECUTE ON FUNCTION save_prediction(VARCHAR(8), VARCHAR(50), VARCHAR(10), INTEGER) TO anon, authenticated;

-- Verification: Check function was updated
SELECT 
  routine_name,
  routine_definition
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name = 'save_prediction';
