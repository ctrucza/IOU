using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Web.Http;

namespace IOUService
{
    public class IOUController : ApiController
    {
        private static Dictionary<string, List<string>> notes = new Dictionary<string, List<string>>();
 
        public string GetCurrentUserName()
        {
            Console.WriteLine(User.Identity.Name);
            return User.Identity.Name;
        }

        [HttpGet]
        public void SendThankYouNoteTo(string recipient)
        {
            string me = GetCurrentUserName();
            if (!notes.ContainsKey(me))
            {
                notes.Add(me, new List<string>());
            }
            notes[me].Add(recipient);
        }
        [HttpGet]
        public List<string> GetNotesSentByMe(string me)
        {
            return notes[me];
        }
    }
}