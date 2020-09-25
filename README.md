# Typeorm Scopes

Scopes for typeorm (Active Record based)

### Why?

See https://guides.rubyonrails.org/active_record_querying.html#scopes for example </br>
Very comfortably, isn't it?

### Usage

Now it is implemented only when typeorm is used with Active Record pattern.

```typescript
@Entity()
class User extends BaseEntity {
    // Scopes
    static get active(): typeof User {
        return declareScope(User, this, { status: 'active' });
    }

    static createdBefore(date: Date): typeof User {
        // implement this
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    status: string;

    @CreateDateColumn()
    public createdAt: Date;

    @UpdateDateColumn()
    public updatedAt: Date;
}
```

And now we can use our scopes to simplify selects

```typescript
// simple one scope
const users = await User.active.find();

// when scope take arguments
const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)); // ugly
const users = await User.createdBefore(yesterday).find();

// chaining
const users = await User.active.createdBefore(yesterday).find();
```

### Samples

See `samples` directory. Also this samples are used in tests, so you can be sure that it is just working
