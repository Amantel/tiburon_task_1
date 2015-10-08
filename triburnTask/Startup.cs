using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(triburnTask.Startup))]
namespace triburnTask
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
