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

        // This being a Get is very baaad
        [HttpGet]
        public void SendThankYouNoteTo(string recipient)
        {
            Notes.Add(new Note(me, recipient));
        }

        [HttpGet]
        public IEnumerable<string> GetNotesSentByMe()
        {
            return Notes.Where(note => note.Sender == me).Select(note => note.ToString());
        }

        public IEnumerable<string> GetMyNotes()
        {
            return Notes.Where(note => note.Recipient == me).Select(note => note.ToString());
        }
    }

    public class Note
    {
        public Note(string sender, string recipient)
        {
            Sender = sender;
            Recipient = recipient;
        }

        public string Sender { get; private set; }

        public string Recipient { get; private set; }

        public override string ToString()
        {
            return string.Format("Thank you, {0}! Sincerely, {1}", Recipient, Sender);
        }
    }
}