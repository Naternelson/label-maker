class ItemsController < ApplicationController

    def create 
        item = Item.create(item_params)
        options = {include: [:item_codes, :product]}
        render json: ItemSerializer.new(item, options)
    end

    def destroy
        item = Item.find_by_id params[:item][:id]
        item.destroy 
        render json: {message: "Item #id #{params[:item][:id]} destroyed"}
    end

    private
    def item_params
        params.require(:item).permit(:product_id, item_codes_attributes: [:item_code_parameter_id, :item_value])
    end


end