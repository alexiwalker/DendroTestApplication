import {
	BasicRouter,
	ConsoleLogger,
	Dendro,
	Env,
	RequestEnvironment
} from "https://raw.githubusercontent.com/alexiwalker/Dendro/master/mod.ts";

//8000 if no env[PORT}, otherwise use env value
let PORT: number = Env.Port(8000, "PORT")

let App: Dendro = new Dendro(PORT);
let router: BasicRouter = new BasicRouter();
App.usesRouter(router);

router.setStaticAssetPath("Application/Assets")
router.addStaticDefaults()

Dendro.setTemplatePath("Application/Templates");

router.serveStatic("/", "index.html", [
	//An example of inline declared middledware
	() => {
		Dendro.logger.info("Home Page accessed")
	}
	// //An example of a pre-existing function included as middleware
	// DecodeBodyJSON
]);

App.usesErrorHandler((e: Error, env: RequestEnvironment) => {

	App.logger.error(`A request to ${env.url} threw an an error: ${e.message}`)
})


App.usesLogger(new ConsoleLogger());

App.logAllErrors = true;

await App.Serve();
