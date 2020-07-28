# Typeorm State Machine

Declarative state machine definition for typeorm entity classes

### Why?

### Usage
Imagine you have some payment model.
This payment has statuses:
- new
- registered
- held
- charged
- error
- refunded

```typescript
enum Status {
    NEW = 'new',
    REGISTERED = 'registered',
    HELD = 'held',
    CHARGED = 'charged',
    ERROR = 'error',
    REFUNDED = 'refunded',
}

@StateMachine({
    transitions: [
        { name: 'register', from: Status.NEW, to: Status.REGISTERED },
        { name: 'hold', from: Status.REGISTERED, to: Status.HELD },
        { name: 'charge', from: Status.HELD, to: Status.CHARGED },
        { name: 'fail', from: [Status.NEW, Status.HELD, STATUS.REGISTERED], to: Status.ERROR },
        { name: 'refund', from: Status.CHARGED, to: Status.REFUNDED },
    ]
})
@Entity()
class Payment {
    @Column()
    guid: string;

    @Column()
    externalId: string;

    @Column()
    amount: number;

    @Column()
    status: Status;
}
```

Also you need interface with these methods and same name as entity

```typescript
interface Payment {
    register(): void;
    hold(): void;
    charge(): void;
    fail(): void;
    refund(): void;
}
```

After the entity will be loaded - state machine initialized with proper status.
And you can use methods from interface which was implemented while entity loading

```typescript
payment.register();
payment.hold();
payment.charge();
payment.refund();

payment.register() // will fail, becauze it is incorrect state transition
```

### Samples

See `samples` directory. Also this samples are used in tests, so you can be sure that it is just working
