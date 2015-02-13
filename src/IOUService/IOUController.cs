using System;
using System.Collections.Generic;
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

        // This being a Get is very baaad
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
        public List<string> GetNotesSentByMe()
        {
            string me = GetCurrentUserName();
            if (notes.ContainsKey(me))
            {
                return notes[me];
            }

            return new List<string>();
        }

        //public List<string> GetMyNotes()
        //{
        //    return something;
        //}
    }
}