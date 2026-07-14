-- DropForeignKey
ALTER TABLE IF EXISTS "credentials" DROP CONSTRAINT IF EXISTS "credentials_user_id_fkey";

-- DropForeignKey
ALTER TABLE IF EXISTS "role_permissions" DROP CONSTRAINT IF EXISTS "role_permissions_permission_id_fkey";

-- DropForeignKey
ALTER TABLE IF EXISTS "role_permissions" DROP CONSTRAINT IF EXISTS "role_permissions_role_id_fkey";

-- DropForeignKey
ALTER TABLE IF EXISTS "user_roles" DROP CONSTRAINT IF EXISTS "user_roles_role_id_fkey";

-- DropForeignKey
ALTER TABLE IF EXISTS "user_roles" DROP CONSTRAINT IF EXISTS "user_roles_user_id_fkey";

-- DropTable
DROP TABLE IF EXISTS "credentials";

-- DropTable
DROP TABLE IF EXISTS "role_permissions";

-- DropTable
DROP TABLE IF EXISTS "user_roles";

-- DropTable
DROP TABLE IF EXISTS "permissions";

-- DropTable
DROP TABLE IF EXISTS "roles";

-- DropEnum
DROP TYPE IF EXISTS "CredentialProvider";
