export function CopytoClipboard(text: string, toast?: any) {
  // Check if the Clipboard API is supported
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard successfully!");
        if (toast) {
          toast({
            title: "Copied to clipboard!",
            description: "Address copied successfully",
          });
        }
      })
      .catch((err) => {
        console.error("Failed to copy text to clipboard: ", err);
        if (toast) {
          toast({
            title: "Failed to copy",
            description: "Could not copy address to clipboard",
            variant: "destructive",
          });
        }
      });
  } else {
    // Fallback method for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      const msg = successful ? "successful" : "unsuccessful";
      if (toast) {
        toast({
          title: successful ? "Copied to clipboard!" : "Failed to copy",
          description: successful ? "Address copied successfully" : "Could not copy address to clipboard",
          variant: successful ? "default" : "destructive",
        });
      }
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
      if (toast) {
        toast({
          title: "Failed to copy",
          description: "Could not copy address to clipboard",
          variant: "destructive",
        });
      }
    }

    document.body.removeChild(textArea);
  }
}
