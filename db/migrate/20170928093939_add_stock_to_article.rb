class AddStockToArticle < ActiveRecord::Migration[5.0]
  def change
    add_reference :articles, :stock, foreign_key: true
  end
end
