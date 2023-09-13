namespace :meet_ups do
  desc "Delete records older than 1 hour"
  task delete_1_hour_old: :environment do
    MeetUp.where(['date < ?', 1.hour.ago]).destroy_all
  end
end
