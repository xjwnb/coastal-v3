import type { RouteRecordRaw } from "vue-router";

export type RouteParamConfig = RouteRecordRaw & { hidden?: boolean };
