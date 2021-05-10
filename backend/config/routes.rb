Rails.application.routes.draw do
  resources :products, except: [:new, :edit]
  resources :items, except: [:new, :edit]
end
