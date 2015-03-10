namespace IOUService
{
    public class Note
    {
        public Note(string sender, string recipient)
        {
            Sender = sender;
            Recipient = recipient;
        }

        public string Sender { get; set; }

        public string Recipient { get; private set; }

        public string Text
        {
            get
            {
                return string.Format("Thank you, {0}! Sincerely, {1}", Recipient, Sender);
            }
        }
    }
}
