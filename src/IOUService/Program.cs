using System;
using System.Net;
using System.Web.Http;

using Microsoft.Owin.Hosting;

using Owin;

namespace IOUService
{
    class Startup
    {
        public void Configuration(IAppBuilder appBuilder)
        {
            SetUpAuth(appBuilder);
            SetUpApi(appBuilder);
            SetUpUi(appBuilder);
        }

        private static void SetUpApi(IAppBuilder appBuilder)
        {
            var configuration = new HttpConfiguration();

            configuration.Routes.MapHttpRoute(
                name: "DefaultRoute",
                routeTemplate: "api/{controller}/{action}",
                defaults: new { id = RouteParameter.Optional });

            appBuilder.UseWebApi(configuration);
        }

        private static void SetUpAuth(IAppBuilder appBuilder)
        {
            var listener = (HttpListener)appBuilder.Properties["System.Net.HttpListener"];
            listener.AuthenticationSchemes = AuthenticationSchemes.IntegratedWindowsAuthentication;
        }

        private static void SetUpUi(IAppBuilder appBuilder)
        {
            appBuilder.UseFileServer("/web");
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            using (WebApp.Start<Startup>(url: "http://+:4242/"))
            {
                Console.Write("IOU server running on port 4242");
                Console.ReadLine();
            }
        }
    }
}
