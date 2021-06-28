import { Router, Request, Response } from "express";
import { ARouter } from "./../ARouter";
import { MIDDLEWARE, HTTP_STATUS } from "./../_interfaces";

export class AuthRouter extends ARouter {
	private _BASE_PATH: string = `/auth`;
	private router: Router = Router();

	public init(): void {
		this._initMiddleware();
		this._initHandlers();
		this._attachRouterToServer();
	}

	private _attachRouterToServer(): void {
		this.express.use(this._BASE_PATH, this.router);
	}

	private _initMiddleware(): void {
		this.router.use(this.middleware.getHandler(MIDDLEWARE.BODY_PARSER));
		this.router.use(this.middleware.getHandler(MIDDLEWARE.COOKIE_PARSER));
	}

	private _initHandlers(): void {
		this.router.post("/", this._login);
		this.router.get("/logout", this._logout);
	}

	private _login = (req: Request, res: Response): void => {
		const { username, password } = req.body;
		// _USERS
		// 	.findOne({ name: username })
		// 	.then(
		// 		(user): void => {
		// 			if (user && password == "123456") {
		res.cookie("username", username, { maxAge: 900000, httpOnly: true });
		res.statusCode = HTTP_STATUS.ACCEPTED;
		res.send({ result: "ok" });
		// 		} else {
		// 			res.clearCookie("username");
		// 			res.statusCode = HTTP_STATUS.NOT_ACCEPTABLE;
		// 			res.send({ exception: "User not found" });
		// 		}
		// 	}
		// )
		// .catch(
		// 	(): void => {
		// 		res.clearCookie("username");
		// 		res.statusCode = HTTP_STATUS.NOT_ACCEPTABLE;
		// 		res.send({ exception: "User not found" });
		// 	}
		// );
	};

	private _logout = (req: Request, res: Response): void => {
		res.clearCookie("username");
		res.statusCode = HTTP_STATUS.ACCEPTED;
		res.send({ result: "ok" });
	};
}
