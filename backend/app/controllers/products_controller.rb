class ProductsController < ApplicationController

    def index
        products = Product.all 
        options = {include: [:item_code_parameters]}
        render json: ProductSerializer.new(products, options)
    end

    def create
        product = Product.create(product_params)
        options = {include: [:item_code_parameters, :items]}
        render json: ProductSerializer.new(product, options)
    end

    def show
        find_product
        options = {include: [:item_code_parameters, :items, :item_codes]}
        render json: ProductSerializer.new(@product, options)
    end

    def update
        find_product
        @product.update(product_params)
        options = {include: [:item_code_parameters, :items]}
        render json: ProductSerializer.new(@product, options)
    end

    def destroy
        find_product
        @product.destroy
        render json: {message: "Product #id #{params[:product][:id]} destroyed" }
    end

    private

    def product_params
        params.require(:product).permit(:name, :description, item_code_parameters_attributes: [:name, :regex])
    end

    def find_product
        @product = Product.find_by_id params[:id]
    end
end
