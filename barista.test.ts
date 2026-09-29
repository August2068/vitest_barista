import { describe, expect, it, vitest } from "vitest";
import { Coffee } from "./barista";
import { Ingredient } from "./barista";
import { Barista } from "./barista";

describe("Coffee", () => {
  it("crée un café avec un nom et un prix", () => {
    const coffee = new Coffee("Cappuccino", 4);

    expect(coffee.name).toBe("Cappuccino");
    expect(coffee.price).toBe(4);
  });

  it("ajoute un ingrédient à la recette", () => {
    const coffee = new Coffee("Cappuccino", 4);
    coffee.addIngredient("coffee", 4);
    // expect(coffee.ingredients[0].name).toBe("coffee");
    // expect(coffee.ingredients[0].quantity).toBe(4);
    // expect(coffee.ingredients[0]).toMatchObject({
    //   name: "coffee",
    //   quantity: 4,
    // });
    expect(coffee.ingredients).toContainEqual({ name: "coffee", quantity: 4 });
  });
});

describe("Ingredient", () => {
  it("ajoute une quantité au stock", () => {
    const ingredient = new Ingredient("milk", 2);
    ingredient.addQuantity(2);
    expect(ingredient.name).toBe("milk");
    expect(ingredient.quantity).toBe(4);
  });

  it("retire une quantité du stock", () => {
    const ingredient = new Ingredient("milk", 2);
    ingredient.removeQuantity(1);
    expect(ingredient.quantity).toBe(1);
  });

  it("refuse de retirer une quantité supérieure au stock", () => {
    const ingredient = new Ingredient("honey", 3);
    expect(ingredient.removeQuantity(4)).toBe(false);
    expect(ingredient.quantity).toBe(3);
  });
});

describe("Barista", () => {
  it("ajoute un café à sa liste de cafés", () => {
    const barista = new Barista("SONIC");
    barista.addCoffee(new Coffee("Cappuccino", 4));
    expect(barista.coffees.length).toBe(1);
    // expect(barista.coffees[0].name).toBe("Cappuccino");
    // expect(barista.coffees[0].price).toBe(4);
    expect(barista.coffees).toContainEqual({
      ingredients: [],
      name: "Cappuccino",
      price: 4,
    });
  });

  it("retourne undefined lorsqu'un café n'existe pas", () => {
    const barista = new Barista("SONIC");
    expect(barista.getCoffee("coffee")).toBeUndefined();
  });

  it("Augmenter quantité d'un ingrédient déjà présent", () => {
    const barista = new Barista("SONIC");
    barista.addIngredient("milk", 5);
    barista.addIngredient("coffee", 7);
    barista.addIngredient("milk", 5);
    expect(barista.ingredients[0].quantity).toBe(10);
    // expect(barista.ingredients).toContainEqual({ name: "milk", quantity: 10 });
  });

  it("peut préparer un café lorsque tous les ingrédients sont disponibles", () => {
    const barista = new Barista("SONIC");
    const coffee = new Coffee("Cappuccino", 4);
    barista.addCoffee(coffee);
    coffee.addIngredient("milk", 5);
    coffee.addIngredient("coffee", 7);
    barista.addIngredient("milk", 5);
    barista.addIngredient("coffee", 7);
    expect(barista.canMakeCoffee(coffee)).toBe(true);
  });

  it("ne peut pas préparer un café lorsqu'un ingrédient est manquant", () => {
    const barista = new Barista("SONIC");
    const coffee = new Coffee("Cappuccino", 4);
    barista.addCoffee(coffee);
    coffee.addIngredient("milk", 5);
    coffee.addIngredient("coffee", 7);
    barista.addIngredient("coffee", 7);
    expect(barista.canMakeCoffee(coffee)).toBe(false);
  });

  it("ne peut pas préparer un café lorsque la quantité est insuffisante", () => {
    const barista = new Barista("SONIC");
    const coffee = new Coffee("Cappuccino", 4);
    barista.addCoffee(coffee);
    coffee.addIngredient("milk", 5);
    coffee.addIngredient("coffee", 7);
    barista.addIngredient("milk", 2);
    barista.addIngredient("coffee", 7);
    expect(barista.canMakeCoffee(coffee)).toBe(false);
  });

  it("consomme les ingrédients lorsqu'il prépare un café", () => {
    const barista = new Barista("SONIC");
    const coffee = new Coffee("Cappuccino", 4);
    barista.addCoffee(coffee);
    coffee.addIngredient("milk", 5);
    coffee.addIngredient("coffee", 7);
    barista.addIngredient("milk", 5);
    barista.addIngredient("coffee", 7);
    barista.makeCoffee(coffee);
    // expect(barista.ingredients).toContainEqual({ name: "milk", quantity: 0 });
    expect(barista.ingredients[0].quantity).toBe(0);
    expect(barista.ingredients[1].quantity).toBe(0);
  });

  it("ne consomme rien lorsqu'il ne peut pas préparer le café", () => {
    const barista = new Barista("SONIC");
    const coffee = new Coffee("Cappuccino", 4);
    barista.addCoffee(coffee);
    coffee.addIngredient("milk", 5);
    coffee.addIngredient("coffee", 7);
    barista.addIngredient("milk", 2);
    barista.addIngredient("coffee", 7);
    barista.makeCoffee(coffee);
    // expect(barista.ingredients).toContainEqual({ name: "milk", quantity: 2 });
    expect(barista.ingredients[0].quantity).toBe(2);
    expect(barista.ingredients[1].quantity).toBe(7);
  });

  it("retourne le prix lorsqu'un café est commandé", () => {
    const barista = new Barista("SONIC");
    const coffee = new Coffee("Cappuccino", 5.99);
    barista.addCoffee(coffee);
    coffee.addIngredient("milk", 5);
    coffee.addIngredient("coffee", 7);
    barista.addIngredient("milk", 5);
    barista.addIngredient("coffee", 7);
    expect(barista.orderCoffee("Cappuccino")).toBe(5.99);
  });

  it("Retourne null si le café qu'on essaye de faire n'existe pas quand on order un café", () => {
    const barista = new Barista("SONIC");
    expect(barista.orderCoffee("Coffee")).toBeNull();
  });

  it("Retourne null si on ne peut pas faire un café quand on order un café", () => {
    const barista = new Barista("SONIC");
    const coffee = new Coffee("Cappuccino", 5.99);
    barista.addCoffee(coffee);
    coffee.addIngredient("milk", 5);
    coffee.addIngredient("coffee", 7);
    expect(barista.orderCoffee("Cappuccino")).toBeNull();
  });
});

// démarre projet avec vites
// installe vitest
// installe v8 pour le coverage
