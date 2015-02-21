using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace IOUService
{
    public class IOUController : ApiController
    {
        private static readonly List<Note> Notes = new List<Note>();

        private readonly string me;

        public IOUController()
        {
            me = GetCurrentUserName();
        }

        public string GetCurrentUserName()
        {
            return User.Identity.Name;
        }

        [HttpPost]
        public void SendThankYouNoteTo(Note note)
        {
            Notes.Add(note);
        }

        [HttpGet]
        public IEnumerable<Note> GetNotesSentByMe()
        {
            return Notes.Where(note => note.Sender == me);
        }

        public IEnumerable<Note> GetMyNotes()
        {
            return Notes.Where(note => note.Recipient == me);
        }
    } 
}