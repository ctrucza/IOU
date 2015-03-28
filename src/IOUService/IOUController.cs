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
            return "John Doe";
            //return User.Identity.Name;
        }

        // This being a Get is very baaad
        [HttpGet]
        public void SendThankYouNoteTo(string recipient)
        {
            Notes.Add(new Note(me, recipient));
            Notes.Add(new Note(recipient, me));
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