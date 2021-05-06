class ProductsController < ApplicationController

    def index
        products = Product.all 
        options = {include: [:item_code_parameters]}
        render json: ProductSerializer.new(products, options)
    end

    def create

    end

    def show
        product = Product.find_by_id params[:id]
        options = {include: [:item_code_parameters, :items]}
        render json: ProductSerializer.new(product, options)
    end

    def update
        binding.pry
    end

    def destroy

    end

end
