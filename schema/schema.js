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
                large
            }
        }
    }
}
`;

exports.SEARCH_CHARACTER_BY_ANIME = `
query Media($search: String) {
  Media(search: $search) {
    characters {
      nodes {
        name {
          first
          last
          full
        }
        image {
          large
        }
      }
    }
  }
}
`;

exports.GET_CHARACTER_BY_ID = `
query Character($id: Int!) {
  Character(id: $id) {
    name {
      full
      last
      first
    }
    image {
      large
    }
  }
}
`;
