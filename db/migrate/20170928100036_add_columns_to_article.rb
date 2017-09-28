class AddColumnsToArticle < ActiveRecord::Migration[5.0]
  def change
    add_column :articles, :source, :string
    add_column :articles, :date, :date
    add_column :articles, :url, :string
  end
end
