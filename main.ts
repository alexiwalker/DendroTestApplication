import {
	BasicRouter,
	ConsoleLogger,
	Dendro,
	Env,
	RequestEnvironment
} from "https://raw.githubusercontent.com/alexiwalker/Dendro/master/mod.ts";

import {DecodeBodyJSON} from "https://raw.githubusercontent.com/alexiwalker/Dendro/master/Middleware/Middleware.ts";

//8000 if no env[PORT}, otherwise use env value
//Key can still be chosen if it differs from PORT, but PORT is default
let PORT: number = Env.Port(8000, "PORT")

//Initialise App to listen on a specific port
let App: Dendro = new Dendro(PORT);

//Create the router the application will use, and then link them
let router: BasicRouter = new BasicRouter();
App.usesRouter(router);

//Set the directory location of any static assets that will be needed, and link the defaults to serve them without further configuration
router.setStaticAssetPath("Application/Assets")
router.addStaticDefaults()

//Set the applications template location.
Dendro.setTemplatePath("Application/Templates");

//Anyone who visits "home" will be served the index.html file but with no filename/extensions in url
router.serveStatic("/", "index.html", [
	//An example of inline declared middleware
	() => {
		Dendro.logger.info("Home Page accessed")
	},
	//An example of a pre-existing function included as middleware
	DecodeBodyJSON
]);

App.usesLogger(new ConsoleLogger());

//Set a function to be called whenever an error occurs while serving a page
App.usesErrorHandler((e: Error, env: RequestEnvironment) => {

	App.logger.error(`A request to ${env.url} threw an an error: ${e.message}`)
})
App.logAllErrors = true;

await App.Serve();
