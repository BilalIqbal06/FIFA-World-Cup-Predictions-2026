-- Cleanup duplicate wagers for all players
-- For each player, keep only the earliest wager in each round range and set later wagers to 0
-- This preserves normal predictions while removing illegal duplicate wagers

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

-- Verification query to check results
SELECT 
  pl.player_code,
  pl.username,
  p.game_id,
  p.wager
FROM predictions p
JOIN players pl ON p.player_id = pl.id
WHERE p.wager > 0
ORDER BY pl.player_code, p.game_id::int;
