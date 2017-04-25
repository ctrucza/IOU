using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http.Filters;

namespace IOUService
{
    public class NoCacheAttribute : CacheControlAttribute
    {
        protected override CacheControlHeaderValue CreateCacheControlHeader()
        {
            return new CacheControlHeaderValue { NoCache = true };
        }
    }

    public class PublicCacheAttribute : CacheControlAttribute
    {
        protected override CacheControlHeaderValue CreateCacheControlHeader()
        {
            var maxAge = TimeSpan.FromMinutes(1);
            return new CacheControlHeaderValue { Public = true, MaxAge = maxAge };
        }
    }

    public abstract class CacheControlAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuted(HttpActionExecutedContext context)
        {
            if (context.Exception != null)
            {
                return;
            }

            if (context.Request.Method != HttpMethod.Get)
            {
                return;
            }

            context.Response.Headers.CacheControl = CreateCacheControlHeader();
        }

        protected abstract CacheControlHeaderValue CreateCacheControlHeader();
    }
}
