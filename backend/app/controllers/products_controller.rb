class ProductsController < ApplicationController

    def index
        products = Product.all 
        options = {include: [:item_code_parameters]}
        render json: ProductSerializer.new(products, options)
    end

    def create

    end

    def show

    end

    def update

    end

    def destroy

    end

end
