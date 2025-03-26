export const getInitials = (name: string) => {
    const words = name.trim().split(/\s+/);
    if (words.length > 1) {
      return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
    }
    return words[0].charAt(0).toUpperCase();
  };