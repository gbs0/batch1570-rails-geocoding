class AddCoordinatesToFlats < ActiveRecord::Migration[7.1]
  def change
    add_column :flats, :latitude, :float, limit: 6
    add_column :flats, :longitude, :float, limit: 6
  end
end
