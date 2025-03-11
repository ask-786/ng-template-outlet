import { gql } from 'apollo-angular';

export const createGetUsers = (name = '', country = '', company = '') => gql`
  {
    users(name: "${name}", country: "${country}", company: "${company}") {
      _id
      age
      eyeColor
      favoriteFruit
      gender
      index
      isActive
      name
      registered
      tags
      company {
        email
        location {
          address
          country
        }
        phone
        title
      }
    }
  }
`;

export const GET_USERS = gql`
  {
    users {
      _id
      age
      eyeColor
      favoriteFruit
      gender
      index
      isActive
      name
      registered
      tags
      company {
        email
        location {
          address
          country
        }
        phone
        title
      }
    }
  }
`;
