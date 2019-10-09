import gql from "graphql-tag";

export const ME = gql`
  query me {
    me {
      ok
      error
      user {
        id
        email
        firstName
        lastName
        age
        major
        phoneNumber
        profilePhoto
        balance
        currentQuestId
        gender
        nickName
        isQuesting
        isMatched
        isDelivering
        currentQuestId
        promotionStamp
        verifiedIDCard
        Account
        promotionGifts
      }
    }
  }
`;

export const UPLOAD_PICTURE = gql`
  mutation uploadPicture($file: Upload!) {
    uploadPicture(file: $file) {
      ok
      error
    }
  }
`;
