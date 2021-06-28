import express, { Express } from "express";
	
// serveStatic

export function defineStaticRoutes(expressInstance: Express): void {
	expressInstance.use(express.static("./public/frontend/"));
	expressInstance.use("/gate", express.static("./public/frontend/gate/"));
	expressInstance.use("/existent", express.static("./existent/"));
}