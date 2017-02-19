import { Actor } from './actor';
import { Country } from './country';
import { Genre } from '../genres/genre';

export class Movie {
    public Id: number;
    public Title: string;
    public ImageURL: string;
    public Source: string;
    public Actors: Actor[];
    public Genres: Genre[];
    public Countries: Country[]; 
    public Timespan: string;
    public Year: number;
    public IsAdult: boolean;
    public Views: number;
}