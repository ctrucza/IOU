using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.DirectoryServices.AccountManagement;

namespace IOUService
{
    public class IOUController : ApiController
    {
        [PublicCache]
        public List<string> GetAllUsers(string term)
        {
            using (PrincipalContext context = new PrincipalContext(ContextType.Domain))
            {
                UserPrincipal qbeUser = new UserPrincipal(context);
                qbeUser.SamAccountName = "*" + term + "*";
                PrincipalSearcher search = new PrincipalSearcher(qbeUser);
                var users = search.FindAll();
                var result = users.Select(p => p.Name).ToList();
                return result;
            } 
        }

        private static readonly List<Note> Notes = new List<Note>();

        private readonly string me;

        public IOUController()
        {
            me = GetCurrentUserName();
        }

        public string GetCurrentUserName()
        {
            //return "John Doe";
            return User.Identity.Name;
        }

        // This being a Get is very baaad
        [HttpGet]
        public void SendThankYouNoteTo(string recipient)
        {
            Notes.Add(new Note(me, recipient));
            Notes.Add(new Note(recipient, me));
        }

        [NoCache]
        [HttpGet]
        public IEnumerable<Note> GetNotesSentByMe()
        {
            return Notes.Where(note => note.Sender == me);
        }

        [NoCache]
        [HttpGet]
        public IEnumerable<Note> GetMyNotes()
        {
            return Notes.Where(note => note.Recipient == me);
        }
    } 
}