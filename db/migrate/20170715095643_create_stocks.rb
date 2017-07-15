# frozen_string_literal: true

class CreateStocks < ActiveRecord::Migration[5.1]
  def change
    create_table :stocks do |t|
      t.text :symbol

      t.timestamps
    end
  end
end
