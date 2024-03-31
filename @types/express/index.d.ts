import { SavedUser } from "@core/types"

declare global{
    namespace Express {
        interface Request {
            user: SavedUser | undefined
        }
    }
}
