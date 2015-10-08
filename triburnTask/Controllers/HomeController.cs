using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Caching;
using triburnTask.App_Start;

namespace triburnTask.Controllers
{



   
    public class HomeController : Controller
    {
       
        public ActionResult Index()
        {
            

             return View();
        }
 
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [HttpPost]
        public JsonResult HandleForm(FormState form) 
        {
            //List<FormState> forms = new List<FormState>();

            //  IList<FormState> forms = HttpContext.Cache["forms"].Cast<FormState>().ToList();

            //HttpContext.Cache["forms"])
            //forms = ((IEnumerable).Cast<FormState>().ToList();

            List<FormState> forms_list = HttpContext.Cache["form_data"] as List<FormState>;
            if (forms_list == null)
                forms_list = new List<FormState>();
            forms_list.Add(form);
            HttpContext.Cache.Insert("form_data", forms_list);


            /*
            HttpContext.Cache.Insert("CacheItem2", "Cached Item 2");
            string cachedString;
            cachedString = (string)HttpContext.Cache["CacheItem2"];

            ViewBag.cache = cachedString;
            form.cache= cachedString;*/
            return Json(forms_list, "application/json", JsonRequestBehavior.DenyGet);
        }

    }
}