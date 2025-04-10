namespace Bookify.Domain.Apartments;

public sealed class Image
{
    public string Url { get; private set; }

    private Image() { }

    public Image(string url)
    {
        Url = url;
    }
}
