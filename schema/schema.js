module.exports = `
query {
    Page(perPage: 50) {
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
