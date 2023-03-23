
const useGenre = (selectedGenres) => {
    if (selectedGenres.length < 1) return "";
  
    const GenreIds = selectedGenres.map((g) => g.id);
    console.log(GenreIds)
  
  };
  
  export default useGenre;