
import { Module } from '@nestjs/common';
import { PokemonsModule } from './pokemons/pokemons.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
    imports: [
        PokemonsModule, 
        ThrottlerModule.forRoot({ // rate limit
            throttlers: [
            {
                ttl: 60000,
                limit: 10,
            },
            ],
        }),
    ],
})
export class AppModule {}
