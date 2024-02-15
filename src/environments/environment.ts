import { PageRoutes } from "../app/shared/enums/page-routes.enum";

export const environment = {
    hostRoot: PageRoutes.LocalHost,
    requestRoot: PageRoutes.LocalHost + PageRoutes.Webapp + PageRoutes.Api + PageRoutes.Version,
    scheduledTaskRoot: PageRoutes.CronHost + PageRoutes.Cron + PageRoutes.Api + PageRoutes.Version,
}