namespace IOUService
{
    public class Note
    {
        public Note(string sender, string recipient)
        {
            Sender = sender;
            Recipient = recipient;
            Text = string.Format("Thank you, {0}! Sincerely, {1}", Recipient, Sender);
        }

        public string Sender { get; private set; }

        public string Recipient { get; private set; }

        public string Text { get; private set; }
    }
}
