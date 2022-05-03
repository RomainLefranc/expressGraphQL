exports.GET_LIST_CHARACTER = `
query Page ($page : Int!){
    Page(page: $page,perPage: 50) {
        characters {
            name {
                first
                last
                full
            }
            image {
                medium
            }
        }
    }
}
`;

exports.GET_CHARACTER_BY_ANIME = `
query Media ($search : String){
    Media(search: $search) {
      characters {
        nodes {
          name {
            full
          }
        }
      }
    }
  }
  `;
