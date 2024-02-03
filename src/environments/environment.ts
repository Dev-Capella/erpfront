import { PageRoutes } from "../app/shared/enums/page-routes.enum";

export const environment = {
    hostRoot: PageRoutes.LocalHost,
    requestRoot: PageRoutes.LocalHost + PageRoutes.Version
}