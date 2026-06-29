-- Cleanup duplicate wagers for all players
-- For each player, keep only the earliest wager in each round range and set later wagers to 0
-- This preserves normal predictions while removing illegal duplicate wagers
-- ONLY changes the wager column - does not alter predictions, player points, game IDs, or any other data

-- ============================================================================
-- PREVIEW: Show what will be changed before running the updates
-- ============================================================================

-- Preview Round of 32 (Games 73-88)
-- Shows which wager will be KEPT vs REMOVED for each player
SELECT 
  'Round of 32' as round,
  pl.player_code,
  pl.username,
  p.game_id,
  p.wager as current_wager,
  CASE 
    WHEN ROW_NUMBER() OVER (PARTITION BY p.player_id ORDER BY p.game_id) = 1 THEN 'KEEP'
    ELSE 'REMOVE → 0'
  END as action
FROM predictions p
JOIN players pl ON p.player_id = pl.id
WHERE p.game_id::int BETWEEN 73 AND 88
AND p.wager > 0
ORDER BY pl.player_code, p.game_id::int;

-- Preview Round of 16 (Games 89-96)
SELECT 
  'Round of 16' as round,
  pl.player_code,
  pl.username,
  p.game_id,
  p.wager as current_wager,
  CASE 
    WHEN ROW_NUMBER() OVER (PARTITION BY p.player_id ORDER BY p.game_id) = 1 THEN 'KEEP'
    ELSE 'REMOVE → 0'
  END as action
FROM predictions p
JOIN players pl ON p.player_id = pl.id
WHERE p.game_id::int BETWEEN 89 AND 96
AND p.wager > 0
ORDER BY pl.player_code, p.game_id::int;

-- Preview Quarterfinals + Semifinals (Games 97-102)
SELECT 
  'QF + SF' as round,
  pl.player_code,
  pl.username,
  p.game_id,
  p.wager as current_wager,
  CASE 
    WHEN ROW_NUMBER() OVER (PARTITION BY p.player_id ORDER BY p.game_id) = 1 THEN 'KEEP'
    ELSE 'REMOVE → 0'
  END as action
FROM predictions p
JOIN players pl ON p.player_id = pl.id
WHERE p.game_id::int BETWEEN 97 AND 102
AND p.wager > 0
ORDER BY pl.player_code, p.game_id::int;

-- ============================================================================
-- UPDATE SCRIPT (wrapped in transaction for safety)
-- Run this AFTER reviewing the preview above
-- If the preview looks wrong, run ROLLBACK; instead
-- ============================================================================

BEGIN;

-- Round of 32: Games 73-88
-- Keep earliest wager, set others to 0
WITH r32_wagers AS (
  SELECT 
    p.id,
    p.player_id,
    p.game_id,
    p.wager,
    ROW_NUMBER() OVER (PARTITION BY p.player_id ORDER BY p.game_id) as wager_order
  FROM predictions p
  WHERE p.game_id::int BETWEEN 73 AND 88
  AND p.wager > 0
)
UPDATE predictions
SET wager = 0
WHERE game_id::int BETWEEN 73 AND 88
AND wager > 0
AND id IN (
  SELECT id FROM r32_wagers WHERE wager_order > 1
);

-- Round of 16: Games 89-96
-- Keep earliest wager, set others to 0
WITH r16_wagers AS (
  SELECT 
    p.id,
    p.player_id,
    p.game_id,
    p.wager,
    ROW_NUMBER() OVER (PARTITION BY p.player_id ORDER BY p.game_id) as wager_order
  FROM predictions p
  WHERE p.game_id::int BETWEEN 89 AND 96
  AND p.wager > 0
)
UPDATE predictions
SET wager = 0
WHERE game_id::int BETWEEN 89 AND 96
AND wager > 0
AND id IN (
  SELECT id FROM r16_wagers WHERE wager_order > 1
);

-- Quarterfinals + Semifinals: Games 97-102
-- Keep earliest wager, set others to 0
WITH qf_sf_wagers AS (
  SELECT 
    p.id,
    p.player_id,
    p.game_id,
    p.wager,
    ROW_NUMBER() OVER (PARTITION BY p.player_id ORDER BY p.game_id) as wager_order
  FROM predictions p
  WHERE p.game_id::int BETWEEN 97 AND 102
  AND p.wager > 0
)
UPDATE predictions
SET wager = 0
WHERE game_id::int BETWEEN 97 AND 102
AND wager > 0
AND id IN (
  SELECT id FROM qf_sf_wagers WHERE wager_order > 1
);

-- ============================================================================
-- COMMIT or ROLLBACK
-- After reviewing the results, run either:
--   COMMIT;  -- to apply the changes permanently
--   ROLLBACK; -- to undo all changes if something looks wrong
-- ============================================================================

-- COMMIT;  -- Uncomment this line after verifying the preview looks correct

-- ============================================================================
-- VERIFICATION: Check final state after commit
-- ============================================================================
SELECT 
  pl.player_code,
  pl.username,
  p.game_id,
  p.wager
FROM predictions p
JOIN players pl ON p.player_id = pl.id
WHERE p.wager > 0
ORDER BY pl.player_code, p.game_id::int;
