using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace movies.Controllers
{
    public abstract class BaseController : ApiController, IDisposable
    {
        protected Entities db = new Entities();
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                this.db.Dispose();
                this.db = null;
            }

            base.Dispose(disposing);
        }
    }
}
