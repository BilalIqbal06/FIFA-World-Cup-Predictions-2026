-- Function: Get public predictions for specific games (for leaderboard display)
-- Returns predictions with username only (no player codes or private IDs)
-- Accessible to all users (anon, authenticated) for public leaderboard

CREATE OR REPLACE FUNCTION get_public_predictions(p_game_ids VARCHAR(50)[])
RETURNS TABLE (
  game_id VARCHAR(50),
  prediction VARCHAR(10),
  wager INTEGER,
  username VARCHAR(50)
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.game_id,
    p.prediction,
    p.wager,
    pl.username
  FROM predictions p
  JOIN players pl ON p.player_id = pl.id
  WHERE p.game_id = ANY(p_game_ids);
END;
$$;

GRANT EXECUTE ON FUNCTION get_public_predictions(VARCHAR(50)[]) TO anon, authenticated;
