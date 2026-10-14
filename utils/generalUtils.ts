import type { IBook, IGame, IMovie, IMusic, IUser } from '../types'

export const publicUser = (user: IUser) => {
  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
  }
}

export const publicMediaItems = (
  mediaItems: IMusic[] | IMovie[] | IGame[] | IBook[],
) => {
  return mediaItems.map((mediaItem) => ({
    ...mediaItem,
    dateOfRelease: mediaItem.date_of_release,
    createdAt: mediaItem.created_at,
    updatedAt: mediaItem.created_at,
    userId: mediaItem.user_id,
  }))
}

export const publicMediaItem = (mediaItem: IMusic | IMovie | IGame | IBook) => {
  return {
    ...mediaItem,
    dateOfRelease: mediaItem.date_of_release,
    createdAt: mediaItem.created_at,
    updatedAt: mediaItem.created_at,
    userId: mediaItem.user_id,
  }
}
