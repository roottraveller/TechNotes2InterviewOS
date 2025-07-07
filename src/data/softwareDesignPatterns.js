export const softwareDesignPatterns = {
  id: 'software-design-patterns',
  title: 'Software Design Patterns',
  content: `
    <h2>Software Design Patterns</h2>
    <p>Design patterns are reusable solutions to common problems in software design. They represent best practices and proven solutions that developers have refined over time.</p>

    <h3>Categories of Design Patterns</h3>
    
    <h4>Creational Patterns</h4>
    <p>Deal with object creation mechanisms, trying to create objects in a manner suitable to the situation.</p>
    
    <h4>Structural Patterns</h4>
    <p>Deal with object composition or the structure of classes and objects.</p>
    
    <h4>Behavioral Patterns</h4>
    <p>Focus on communication between objects and the assignment of responsibilities.</p>

    <h3>Creational Patterns</h3>
    
    <h4>1. Singleton Pattern</h4>
    <p>Ensures a class has only one instance and provides global access to it.</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// JavaScript Singleton
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    this.connection = this.connect();
    Database.instance = this;
  }
  
  connect() {
    // Database connection logic
    return { connected: true };
  }
}

// Thread-safe Singleton in Java
public class Singleton {
    private static volatile Singleton instance;
    
    private Singleton() {}
    
    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}</code></pre>
    </div>

    <h4>2. Factory Pattern</h4>
    <p>Provides an interface for creating objects without specifying their exact classes.</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Factory Pattern Example
class VehicleFactory {
  createVehicle(type) {
    switch(type) {
      case 'car':
        return new Car();
      case 'truck':
        return new Truck();
      case 'motorcycle':
        return new Motorcycle();
      default:
        throw new Error('Unknown vehicle type');
    }
  }
}

// Abstract Factory Pattern
class UIFactory {
  static getFactory(os) {
    switch(os) {
      case 'windows':
        return new WindowsUIFactory();
      case 'mac':
        return new MacUIFactory();
      case 'linux':
        return new LinuxUIFactory();
    }
  }
}

class WindowsUIFactory {
  createButton() { return new WindowsButton(); }
  createCheckbox() { return new WindowsCheckbox(); }
}</code></pre>
    </div>

    <h4>3. Builder Pattern</h4>
    <p>Separates the construction of complex objects from their representation.</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Builder Pattern
class HttpRequest {
  constructor(builder) {
    this.method = builder.method;
    this.url = builder.url;
    this.headers = builder.headers;
    this.body = builder.body;
    this.timeout = builder.timeout;
  }
}

class HttpRequestBuilder {
  constructor(method, url) {
    this.method = method;
    this.url = url;
    this.headers = {};
  }
  
  setHeader(key, value) {
    this.headers[key] = value;
    return this;
  }
  
  setBody(body) {
    this.body = body;
    return this;
  }
  
  setTimeout(timeout) {
    this.timeout = timeout;
    return this;
  }
  
  build() {
    return new HttpRequest(this);
  }
}

// Usage
const request = new HttpRequestBuilder('POST', '/api/users')
  .setHeader('Content-Type', 'application/json')
  .setBody({ name: 'John' })
  .setTimeout(5000)
  .build();</code></pre>
    </div>

    <h4>4. Prototype Pattern</h4>
    <p>Creates new objects by cloning existing instances.</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Prototype Pattern
class Shape {
  clone() {
    return Object.create(
      Object.getPrototypeOf(this),
      Object.getOwnPropertyDescriptors(this)
    );
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
}

// Usage
const rect1 = new Rectangle(10, 20);
const rect2 = rect1.clone();
rect2.width = 30; // rect1 remains unchanged</code></pre>
    </div>

    <h3>Structural Patterns</h3>
    
    <h4>1. Adapter Pattern</h4>
    <p>Allows incompatible interfaces to work together.</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Adapter Pattern
// Old payment interface
class OldPaymentSystem {
  makePayment(amount) {
    console.log(\`Processing $\${amount} through old system\`);
  }
}

// New payment interface expected by our app
class PaymentInterface {
  processPayment(amount, currency) {
    throw new Error('Must implement processPayment');
  }
}

// Adapter
class PaymentAdapter extends PaymentInterface {
  constructor(oldPaymentSystem) {
    super();
    this.oldSystem = oldPaymentSystem;
  }
  
  processPayment(amount, currency) {
    // Convert to old system format
    const convertedAmount = this.convertCurrency(amount, currency);
    this.oldSystem.makePayment(convertedAmount);
  }
  
  convertCurrency(amount, currency) {
    // Currency conversion logic
    return amount; // Simplified
  }
}</code></pre>
    </div>

    <h4>2. Decorator Pattern</h4>
    <p>Adds new functionality to objects without altering their structure.</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Decorator Pattern
class Coffee {
  cost() { return 5; }
  description() { return 'Simple coffee'; }
}

class CoffeeDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }
  
  cost() { return this.coffee.cost(); }
  description() { return this.coffee.description(); }
}

class MilkDecorator extends CoffeeDecorator {
  cost() { return this.coffee.cost() + 2; }
  description() { return this.coffee.description() + ', milk'; }
}

class SugarDecorator extends CoffeeDecorator {
  cost() { return this.coffee.cost() + 1; }
  description() { return this.coffee.description() + ', sugar'; }
}

// Usage
let coffee = new Coffee();
coffee = new MilkDecorator(coffee);
coffee = new SugarDecorator(coffee);
console.log(coffee.description()); // "Simple coffee, milk, sugar"
console.log(coffee.cost()); // 8</code></pre>
    </div>

    <h4>3. Proxy Pattern</h4>
    <p>Provides a placeholder or surrogate for another object to control access to it.</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Proxy Pattern
class DatabaseService {
  query(sql) {
    console.log(\`Executing: \${sql}\`);
    return 'Query results';
  }
}

class DatabaseProxy {
  constructor(database, user) {
    this.database = database;
    this.user = user;
  }
  
  query(sql) {
    if (this.hasAccess(sql)) {
      this.log(sql);
      return this.database.query(sql);
    } else {
      throw new Error('Access denied');
    }
  }
  
  hasAccess(sql) {
    // Check user permissions
    if (sql.includes('DELETE') && this.user.role !== 'admin') {
      return false;
    }
    return true;
  }
  
  log(sql) {
    console.log(\`User \${this.user.name} executed: \${sql}\`);
  }
}</code></pre>
    </div>

    <h4>4. Composite Pattern</h4>
    <p>Composes objects into tree structures to represent part-whole hierarchies.</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Composite Pattern
class FileSystemComponent {
  getName() { throw new Error('Must implement'); }
  getSize() { throw new Error('Must implement'); }
}

class File extends FileSystemComponent {
  constructor(name, size) {
    super();
    this.name = name;
    this.size = size;
  }
  
  getName() { return this.name; }
  getSize() { return this.size; }
}

class Directory extends FileSystemComponent {
  constructor(name) {
    super();
    this.name = name;
    this.children = [];
  }
  
  add(component) {
    this.children.push(component);
  }
  
  getName() { return this.name; }
  
  getSize() {
    return this.children.reduce(
      (total, child) => total + child.getSize(), 0
    );
  }
}

// Usage
const root = new Directory('root');
const src = new Directory('src');
root.add(src);
src.add(new File('index.js', 1000));
src.add(new File('app.js', 2000));
console.log(root.getSize()); // 3000</code></pre>
    </div>

    <h3>Behavioral Patterns</h3>
    
    <h4>1. Observer Pattern</h4>
    <p>Defines a one-to-many dependency between objects.</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Observer Pattern
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  
  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(
        cb => cb !== callback
      );
    }
  }
  
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
}

// Usage
const emitter = new EventEmitter();
const handler = (data) => console.log('Received:', data);

emitter.on('message', handler);
emitter.emit('message', 'Hello World');</code></pre>
    </div>

    <h4>2. Strategy Pattern</h4>
    <p>Defines a family of algorithms and makes them interchangeable.</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Strategy Pattern
class PaymentProcessor {
  constructor(strategy) {
    this.strategy = strategy;
  }
  
  setStrategy(strategy) {
    this.strategy = strategy;
  }
  
  processPayment(amount) {
    return this.strategy.pay(amount);
  }
}

class CreditCardStrategy {
  pay(amount) {
    console.log(\`Paid $\${amount} using Credit Card\`);
    return { success: true, method: 'credit_card' };
  }
}

class PayPalStrategy {
  pay(amount) {
    console.log(\`Paid $\${amount} using PayPal\`);
    return { success: true, method: 'paypal' };
  }
}

class BitcoinStrategy {
  pay(amount) {
    console.log(\`Paid $\${amount} using Bitcoin\`);
    return { success: true, method: 'bitcoin' };
  }
}

// Usage
const processor = new PaymentProcessor(new CreditCardStrategy());
processor.processPayment(100);
processor.setStrategy(new BitcoinStrategy());
processor.processPayment(50);</code></pre>
    </div>

    <h4>3. Command Pattern</h4>
    <p>Encapsulates requests as objects, allowing parameterization and queuing.</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Command Pattern
class Command {
  execute() { throw new Error('Must implement'); }
  undo() { throw new Error('Must implement'); }
}

class Light {
  turnOn() { console.log('Light is ON'); }
  turnOff() { console.log('Light is OFF'); }
}

class TurnOnCommand extends Command {
  constructor(light) {
    super();
    this.light = light;
  }
  
  execute() { this.light.turnOn(); }
  undo() { this.light.turnOff(); }
}

class RemoteControl {
  constructor() {
    this.history = [];
  }
  
  executeCommand(command) {
    command.execute();
    this.history.push(command);
  }
  
  undo() {
    const command = this.history.pop();
    if (command) {
      command.undo();
    }
  }
}</code></pre>
    </div>

    <h4>4. Iterator Pattern</h4>
    <p>Provides a way to access elements of a collection sequentially.</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Iterator Pattern
class ArrayIterator {
  constructor(items) {
    this.items = items;
    this.index = 0;
  }
  
  hasNext() {
    return this.index < this.items.length;
  }
  
  next() {
    return this.items[this.index++];
  }
  
  reset() {
    this.index = 0;
  }
}

// ES6 Iterator Protocol
class Range {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
  
  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    
    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        }
        return { done: true };
      }
    };
  }
}

// Usage
const range = new Range(1, 5);
for (const num of range) {
  console.log(num); // 1, 2, 3, 4, 5
}</code></pre>
    </div>

    <h3>Modern Patterns</h3>
    
    <h4>1. Dependency Injection</h4>
    <p>A technique for achieving Inversion of Control between classes and their dependencies.</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Dependency Injection
class EmailService {
  send(to, subject, body) {
    console.log(\`Sending email to \${to}\`);
  }
}

class SMSService {
  send(to, message) {
    console.log(\`Sending SMS to \${to}\`);
  }
}

class NotificationService {
  constructor(emailService, smsService) {
    this.emailService = emailService;
    this.smsService = smsService;
  }
  
  notify(user, message) {
    if (user.email) {
      this.emailService.send(user.email, 'Notification', message);
    }
    if (user.phone) {
      this.smsService.send(user.phone, message);
    }
  }
}

// DI Container
class Container {
  constructor() {
    this.services = new Map();
  }
  
  register(name, factory) {
    this.services.set(name, factory);
  }
  
  get(name) {
    const factory = this.services.get(name);
    return factory(this);
  }
}</code></pre>
    </div>

    <h4>2. Repository Pattern</h4>
    <p>Encapsulates data access logic and provides a more object-oriented view of the persistence layer.</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Repository Pattern
class UserRepository {
  constructor(database) {
    this.db = database;
  }
  
  async findById(id) {
    const data = await this.db.query(
      'SELECT * FROM users WHERE id = ?', [id]
    );
    return data ? new User(data) : null;
  }
  
  async save(user) {
    if (user.id) {
      await this.db.query(
        'UPDATE users SET name = ?, email = ? WHERE id = ?',
        [user.name, user.email, user.id]
      );
    } else {
      const result = await this.db.query(
        'INSERT INTO users (name, email) VALUES (?, ?)',
        [user.name, user.email]
      );
      user.id = result.insertId;
    }
    return user;
  }
  
  async findByEmail(email) {
    const data = await this.db.query(
      'SELECT * FROM users WHERE email = ?', [email]
    );
    return data ? new User(data) : null;
  }
}</code></pre>
    </div>

    <h4>3. Module Pattern</h4>
    <p>Provides encapsulation and namespace management.</p>
    
    <div class="code-block">
      <div class="code-label">CODE</div>
      <pre><code>// Module Pattern
const UserModule = (function() {
  // Private variables
  let users = [];
  
  // Private functions
  function validateEmail(email) {
    return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
  }
  
  // Public API
  return {
    addUser(name, email) {
      if (!validateEmail(email)) {
        throw new Error('Invalid email');
      }
      users.push({ name, email });
    },
    
    getUsers() {
      return [...users]; // Return copy
    },
    
    getUserCount() {
      return users.length;
    }
  };
})();</code></pre>
    </div>

    <h3>Pattern Selection Guidelines</h3>
    
    <h4>When to Use Which Pattern</h4>
    
    <table>
      <thead>
        <tr>
          <th>Pattern</th>
          <th>Use When</th>
          <th>Avoid When</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Singleton</td>
          <td>Need exactly one instance (e.g., database connection)</td>
          <td>Testing is important (hard to mock)</td>
        </tr>
        <tr>
          <td>Factory</td>
          <td>Object creation is complex or varies</td>
          <td>Simple object creation suffices</td>
        </tr>
        <tr>
          <td>Observer</td>
          <td>Multiple objects need state updates</td>
          <td>Simple one-to-one relationships</td>
        </tr>
        <tr>
          <td>Strategy</td>
          <td>Multiple algorithms for same task</td>
          <td>Algorithm rarely changes</td>
        </tr>
        <tr>
          <td>Decorator</td>
          <td>Add features dynamically</td>
          <td>Static feature set</td>
        </tr>
      </tbody>
    </table>

    <h3>Anti-Patterns to Avoid</h3>
    
    <ul>
      <li><strong>God Object:</strong> Class that knows/does too much</li>
      <li><strong>Spaghetti Code:</strong> Code with complex, tangled control structure</li>
      <li><strong>Copy-Paste Programming:</strong> Duplicate code instead of abstraction</li>
      <li><strong>Magic Numbers:</strong> Hardcoded numeric values</li>
      <li><strong>Premature Optimization:</strong> Optimizing before profiling</li>
      <li><strong>Reinventing the Wheel:</strong> Creating existing solutions</li>
    </ul>

    <h3>Pattern Combinations</h3>
    
    <p>Patterns often work together:</p>
    <ul>
      <li><strong>MVC:</strong> Combines Observer, Strategy, and Composite</li>
      <li><strong>Abstract Factory + Singleton:</strong> Single factory instance</li>
      <li><strong>Decorator + Factory:</strong> Factory creates decorated objects</li>
      <li><strong>Command + Memento:</strong> Undo/redo functionality</li>
      <li><strong>Strategy + Factory:</strong> Factory selects strategy</li>
    </ul>
  `
}; 