#### USERS ####

User.destroy_all

stockbali = User.new(
  id: 1,
  username: 'stockbali',
  email: 'stockbali@stockbaat.com',
  photo_url: 'https://cdn-images-1.medium.com/fit/c/200/200/1*DBcKxNqlgMYP7HJmZBTMtQ.png'
)

stockbali.password = 'stockbalilogin'
stockbali.save

guest = User.new(
  id: 2,
  username: 'guest',
  email: 'guest@stockbaat.com',
  photo_url: Faker::Avatar.image('guest', "50x50"),
  current_channel: Channel.last.id,
)

guest.password = 'guestlogin'
guest.save
