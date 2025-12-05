-- Check for existing duplicates before adding constraint
-- This query will show any duplicate (organization_id, email) combinations
DO $$
DECLARE
  duplicate_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO duplicate_count
  FROM (
    SELECT organization_id, email, COUNT(*) as cnt
    FROM team_members
    GROUP BY organization_id, email
    HAVING COUNT(*) > 1
  ) duplicates;

  IF duplicate_count > 0 THEN
    RAISE EXCEPTION 'Found % duplicate organization_id + email combinations in team_members. Please clean up duplicates before running this migration.', duplicate_count;
  END IF;
END $$;

-- Add unique constraint on (organization_id, email)
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_org_email_unique" UNIQUE("organization_id", "email");
